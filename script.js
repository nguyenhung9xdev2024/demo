function loadData() {
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
            destroy: true,
            columns: [
                { data: 'id', title: 'STT' },
                { data: 'date', title: 'Thời gian' },
                { data: 'transaction_id', title: 'Transaction ID' },
                { data: 'amount', title: 'Số tiền', render: $.fn.dataTable.render.number(',', '.', 0, '', ' ₫') },
                { data: 'description', title: 'Nội dung' }
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
