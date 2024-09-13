let currentPage = 1;
const rowsPerPage = 50;

async function loadData() {
    const totalParts = 201; // Tổng số phần JSON
    const dataFolderPath = 'data/'; // Thư mục chứa các file JSON
    let allData = [];

    for (let i = 1; i <= totalParts; i++) {
        const fileName = `chuyen_khoan_part_${i}.json`; // Tên file JSON
        const filePath = `${dataFolderPath}${fileName}`;

        try {
            const response = await fetch(filePath);
            if (!response.ok) {
                console.error(`Không thể tải file: ${filePath}`);
                continue;
            }
            const data = await response.json();
            allData = allData.concat(data);
        } catch (error) {
            console.error(`Lỗi khi tải file ${filePath}:`, error);
        }
    }

    displayData(allData);
}

function displayData(allData) {
    let totalCount = allData.length;
    let sumAmount = allData.reduce((sum, item) => sum + item.Amount, 0);
    let minAmount = Math.min(...allData.map(item => item.Amount));
    let maxAmount = Math.max(...allData.map(item => item.Amount));

    document.getElementById('totalCount').textContent = totalCount;
    document.getElementById('sumAmount').textContent = sumAmount.toLocaleString('vi-VN') + ' ₫';
    document.getElementById('minAmount').textContent = minAmount.toLocaleString('vi-VN') + ' ₫';
    document.getElementById('maxAmount').textContent = maxAmount.toLocaleString('vi-VN') + ' ₫';

    renderPage(allData); // Bắt đầu hiển thị trang đầu tiên
}

function renderPage(allData) {
    let tbody = document.querySelector('#donationTable tbody');
    tbody.innerHTML = '';

    let start = (currentPage - 1) * rowsPerPage;
    let end = start + rowsPerPage;
    let pageData = allData.slice(start, end);

    pageData.forEach(item => {
        let row = `<tr>
            <td>${item.Date}</td>
            <td>${item.DocNo}</td>
            <td>${item.Amount.toLocaleString('vi-VN')} ₫</td>
            <td>${item.Details}</td>
        </tr>`;
        tbody.innerHTML += row;
    });

    // Hiển thị nút phân trang
    displayPagination(allData.length);
}

function displayPagination(totalRows) {
    let paginationDiv = document.getElementById('pagination');
    paginationDiv.innerHTML = '';

    let totalPages = Math.ceil(totalRows / rowsPerPage);

    // Nút trang trước
    if (currentPage > 1) {
        let prevButton = document.createElement('button');
        prevButton.textContent = 'Trước';
        prevButton.onclick = () => {
            currentPage--;
            renderPage(allData);
        };
        paginationDiv.appendChild(prevButton);
    }

    // Nút trang tiếp theo
    if (currentPage < totalPages) {
        let nextButton = document.createElement('button');
        nextButton.textContent = 'Tiếp theo';
        nextButton.onclick = () => {
            currentPage++;
            renderPage(allData);
        };
        paginationDiv.appendChild(nextButton);
    }
}

// Gọi hàm loadData để tải và hiển thị dữ liệu
loadData();
