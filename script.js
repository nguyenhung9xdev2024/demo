$(document).ready(function () {
    $.getJSON('data/chuyen_khoan_part_1.json', function (data) {
        $('#donationTable').DataTable({
            data: data,
            columns: [
                { data: 'Date' },
                { data: 'DocNo' },
                { data: 'Amount', render: $.fn.dataTable.render.number(',', '.', 0, '', ' ₫') },
                { data: 'Details' }
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
