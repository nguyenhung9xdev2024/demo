function loadData() {
    $.getJSON('data/chuyen_khoan_part_1.json', function (data) {

        let totalCount = data.length;
        let sumAmount = data.reduce((acc, curr) => acc + curr.credit, 0);
        let minAmount = Math.min(...data.map(item => item.credit));
        let maxAmount = Math.max(...data.map(item => item.credit));

        console.log("Tổng số lượng:", totalCount);
        console.log("Tổng số tiền:", sumAmount);
        console.log("Số tiền nhỏ nhất:", minAmount);
        console.log("Số tiền lớn nhất:", maxAmount);

        document.getElementById('totalCount').textContent = totalCount;
        document.getElementById('sumAmount').textContent = sumAmount.toLocaleString('vi-VN') + ' ₫';
        document.getElementById('minAmount').textContent = minAmount.toLocaleString('vi-VN') + ' ₫';
        document.getElementById('maxAmount').textContent = maxAmount.toLocaleString('vi-VN') + ' ₫';

        $('#donationTable').DataTable({
            data: data,
            destroy: true,
            columns: [
                { data: 'date_time', title: 'Date Time' },
                { data: 'trans_no', title: 'Transaction No' },
                { data: 'credit', title: 'Credit', render: $.fn.dataTable.render.number(',', '.', 0, '', ' ₫') },
                { data: 'detail', title: 'Details' }
            ],
            paging: true,
            searching: true,
            pageLength: 15,
            lengthMenu: [15, 25, 50, 100, 200],
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
}

// Gọi hàm loadData khi trang vừa tải
$(document).ready(function () {
    loadData();
});
