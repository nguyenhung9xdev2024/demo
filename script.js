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

     let index = 0;
     function addRows() {
         const batchSize = 100; // Số hàng thêm mỗi lần để tránh stack overflow
         for (let i = 0; i < batchSize && index < allData.length; i++, index++) {
             let item = allData[index];
             let row = `<tr>
                 <td>${item.Date}</td>
                 <td>${item.DocNo}</td>
                 <td>${item.Amount.toLocaleString('vi-VN')} ₫</td>
                 <td>${item.Details}</td>
             </tr>`;
             tbody.innerHTML += row;
         }
         if (index < allData.length) {
             setTimeout(addRows, 0); // Gọi tiếp phần tiếp theo khi có quá nhiều dữ liệu
         }
     }
 
     addRows(); // Bắt đầu thêm dữ liệu vào bảng
 }

 loadData();