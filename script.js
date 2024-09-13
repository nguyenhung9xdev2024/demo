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

    let tbody = document.querySelector('#donationTable tbody');
    tbody.innerHTML = '';

    // Sử dụng hàng đợi để thêm dữ liệu theo từng lô
    let index = 0;
    let queue = allData.slice(); // Tạo bản sao của dữ liệu để sử dụng hàng đợi

    function processQueue() {
        if (queue.length === 0) {
            return; // Dừng lại nếu không còn hàng trong hàng đợi
        }

        const batchSize = 50; // Số lượng hàng thêm vào mỗi lần
        let fragment = document.createDocumentFragment(); // Sử dụng fragment để tăng hiệu suất

        for (let i = 0; i < batchSize && queue.length > 0; i++) {
            let item = queue.shift(); // Lấy phần tử từ hàng đợi
            let row = document.createElement('tr');
            row.innerHTML = `
                <td>${item.Date}</td>
                <td>${item.DocNo}</td>
                <td>${item.Amount.toLocaleString('vi-VN')} ₫</td>
                <td>${item.Details}</td>
            `;
            fragment.appendChild(row);
        }

        tbody.appendChild(fragment); // Thêm hàng mới vào DOM sau khi xử lý lô hàng hiện tại

        // Gọi lại hàm processQueue để xử lý các phần tử còn lại trong hàng đợi
        setTimeout(processQueue, 50); // Đợi 50ms trước khi tiếp tục xử lý phần tiếp theo
    }

    processQueue(); // Bắt đầu xử lý hàng đợi
}

// Gọi hàm loadData để tải và hiển thị dữ liệu
loadData();