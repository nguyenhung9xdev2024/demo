$(document).ready(function () {
    $.getJSON('data/chuyen_khoan_part_1.json', function (data) {

         let totalCount = data.length;
         let sumAmount = data.reduce((acc, curr) => acc + curr.credit, 0);
         let minAmount = Math.min(...data.map(item => item.credit));
         let maxAmount = Math.max(...data.map(item => item.credit));
 
         document.getElementById('totalCount').textContent = totalCount;
         document.getElementById('sumAmount').textContent = sumAmount.toLocaleString('vi-VN') + ' ₫';
         document.getElementById('minAmount').textContent = minAmount.toLocaleString('vi-VN') + ' ₫';
         document.getElementById('maxAmount').textContent = maxAmount.toLocaleString('vi-VN') + ' ₫';

        $('#donationTable').DataTable({
            data: data,
            columns: [
                { data: 'date_time', title: 'Date Time' },
                { data: 'trans_no', title: 'Transaction No' },
                { data: 'credit', title: 'Credit', render: $.fn.dataTable.render.number(',', '.', 0, '', ' ₫') },
                { data: 'detail', title: 'Details' }
            ],
            paging: true, // Tính năng phân trang
            searching: true, // Tính năng tìm kiếm
            pageLength: 10, // Hiển thị 10 dòng mỗi trang (có thể thay đổi)
            lengthMenu: [10, 25, 50, 100], // Tùy chọn số dòng mỗi trang
            language: {
                paginate: {
                    previous: "Trước",
                    next: "Tiếp theo"
                },
                lengthMenu: "Hiển thị _MENU_ dòng mỗi trang",
                info: "Hiển thị _START_ đến _END_ của _TOTAL_ mục",
                search: "Tìm kiếm:"
            }
        });
    });
});
