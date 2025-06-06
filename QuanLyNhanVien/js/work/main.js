// Định nghĩa class NhanVien
class NhanVien {
    constructor(taiKhoan, hoTen, email, matKhau, ngayLam, luongCoBan, chucVu, gioLam) {
        this.taiKhoan = taiKhoan;
        this.hoTen = hoTen;
        this.email = email;
        this.matKhau = matKhau;
        this.ngayLam = ngayLam;
        this.luongCoBan = Number(luongCoBan);
        this.chucVu = chucVu;
        this.gioLam = Number(gioLam);
        this.tongLuong = this.tinhTongLuong();
        this.loaiNV = this.xepLoai();
    }

    tinhTongLuong() {
        switch (this.chucVu) {
            case "Giám đốc":
                return this.luongCoBan * 3;
            case "Trưởng Phòng":
                return this.luongCoBan * 2;
            case "Nhân Viên":
                return this.luongCoBan;
            default:
                return 0;
        }
    }

    xepLoai() {
        if (this.gioLam >= 192) return "Xuất sắc";
        if (this.gioLam >= 176) return "Giỏi";
        if (this.gioLam >= 160) return "Khá";
        return "Trung bình";
    }
}

// Khởi tạo danh sách nhân viên
let dsNhanVien = [];

// Hàm render danh sách nhân viên ra bảng
function renderTable(ds) {
    const tbody = document.getElementById("tableDanhSach");
    if (!tbody) return;
    tbody.innerHTML = ds.map(nv => `
        <tr>
            <td>${nv.taiKhoan}</td>
            <td>${nv.hoTen}</td>
            <td>${nv.email}</td>
            <td>${nv.ngayLam}</td>
            <td>${nv.chucVu}</td>
            <td>${nv.tongLuong.toLocaleString()}</td>
            <td>${nv.loaiNV}</td>
            <td>
                <button onclick="xoaNhanVien('${nv.taiKhoan}')">Xóa</button>
                <button onclick="suaNhanVien('${nv.taiKhoan}')">Sửa</button>
            </td>
        </tr>
    `).join('');
    hienThiTongLuongTheoChucVu();
}

// Hàm hiển thị tổng lương theo chức vụ
function hienThiTongLuongTheoChucVu() {
    const tongLuong = {
        "Giám đốc": 0,
        "Trưởng Phòng": 0,
        "Nhân Viên": 0
    };
    dsNhanVien.forEach(nv => {
        if (tongLuong.hasOwnProperty(nv.chucVu)) {
            tongLuong[nv.chucVu] += nv.tongLuong;
        }
    });
    const div = document.getElementById("tongLuongTheoChucVu");
    if (div) {
        div.innerHTML = `
            <strong>Tổng lương theo chức vụ:</strong><br>
            Giám đốc: ${tongLuong["Giám đốc"].toLocaleString()}<br>
            Trưởng Phòng: ${tongLuong["Trưởng Phòng"].toLocaleString()}<br>
            Nhân Viên: ${tongLuong["Nhân Viên"].toLocaleString()}
        `;
    }
}



// Hàm lấy thông tin nhân viên từ form và kiểm tra hợp lệ
function layThongTinNV() {
    const taiKhoan = document.getElementById("tknv").value.trim();
    const hoTen = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const matKhau = document.getElementById("password").value;
    const ngayLam = document.getElementById("datepicker").value.trim();
    const luongCoBan = Number(document.getElementById("luongCB").value);
    const chucVu = document.getElementById("chucVu").value;
    const gioLam = Number(document.getElementById("gioLam").value);

    // Kiểm tra hợp lệ
    if (!taiKhoan || !/^\d{4,6}$/.test(taiKhoan)) {
        alert("Tài khoản 4-6 ký số, không để trống");
        return null;
    }
    if (!/^[a-zA-ZÀ-ỹ\s]+$/.test(hoTen)) {
        alert("Tên nhân viên phải là chữ, không để trống");
        return null;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        alert("Email không hợp lệ, không để trống");
        return null;
    }
    if (!/^(?=.*\d)(?=.*[A-Z])(?=.*\W).{6,10}$/.test(matKhau)) {
        alert("Mật khẩu 6-10 ký tự, ít nhất 1 số, 1 in hoa, 1 ký tự đặc biệt");
        return null;
    }
    if (!/^(0[1-9]|1[0-2])\/(0[1-9]|[12]\d|3[01])\/\d{4}$/.test(ngayLam)) {
        alert("Ngày làm không để trống, định dạng mm/dd/yyyy");
        return null;
    }
    if (isNaN(luongCoBan) || !(luongCoBan >= 1000000 && luongCoBan <= 20000000)) {
        alert("Lương cơ bản 1 000 000 - 20 000 000, không để trống");
        return null;
    }
    // Kiểm tra chức vụ phải nằm trong các option của select
    const chucVuSelect = document.getElementById("chucVu");
    const validChucVu = Array.from(chucVuSelect.options).map(opt => opt.value);
    if (!validChucVu.includes(chucVu)) {
        alert("Chức vụ không hợp lệ, không để trống");
        return null;
    }
    if (!(gioLam >= 80 && gioLam <= 200)) {
        alert("Số giờ làm 80 - 200, không để trống");
        return null;
    }

    return new NhanVien(taiKhoan, hoTen, email, matKhau, ngayLam, luongCoBan, chucVu, gioLam);
}

// Hàm reset form
function resetForm() {
    document.getElementById("tknv").value = "";
    document.getElementById("name").value = "";
    document.getElementById("email").value = "";
    document.getElementById("password").value = "";
    document.getElementById("datepicker").value = "";
    document.getElementById("luongCB").value = "";
    document.getElementById("chucVu").value = "";
    document.getElementById("gioLam").value = "";
    document.getElementById("tknv").disabled = false;
}

// Thêm nhân viên
window.themNhanVien = function() {
    const nv = layThongTinNV();
    if (!nv) return;
    if (dsNhanVien.some(x => x.taiKhoan === nv.taiKhoan)) {
        alert("Tài khoản đã tồn tại!");
        return;
    }
    dsNhanVien.push(nv);
    renderTable(dsNhanVien);
    resetForm();
}

// Xóa nhân viên
window.xoaNhanVien = function(taiKhoan) {
    dsNhanVien = dsNhanVien.filter(nv => nv.taiKhoan !== taiKhoan);
    renderTable(dsNhanVien);
}

// Sửa nhân viên (đổ dữ liệu lên form)
window.suaNhanVien = function(taiKhoan) {
    const nv = dsNhanVien.find(nv => nv.taiKhoan === taiKhoan);
    if (!nv) return;
    document.getElementById("tknv").value = nv.taiKhoan;
    document.getElementById("name").value = nv.hoTen;
    document.getElementById("email").value = nv.email;
    document.getElementById("password").value = nv.matKhau;
    document.getElementById("datepicker").value = nv.ngayLam;
    document.getElementById("luongCB").value = nv.luongCoBan;
    document.getElementById("chucVu").value = nv.chucVu;
    document.getElementById("gioLam").value = nv.gioLam;
    document.getElementById("tknv").disabled = true;
}

// Cập nhật nhân viên
window.capNhatNhanVien = function() {
    const nv = layThongTinNV();
    if (!nv) return;
    const index = dsNhanVien.findIndex(x => x.taiKhoan === nv.taiKhoan);
    if (index === -1) return;
    dsNhanVien[index] = nv;
    renderTable(dsNhanVien);
    resetForm();
    document.getElementById("tknv").disabled = false;
}

// Tìm nhân viên theo loại
window.timNhanVienTheoLoai = function() {
    const loai = document.getElementById("searchName").value.trim().toLowerCase();
    const ketQua = dsNhanVien.filter(nv => nv.loaiNV.toLowerCase().includes(loai));
    renderTable(ketQua);
}


document.addEventListener("DOMContentLoaded", function() {
    const chucVuSelect = document.getElementById("chucVu");
    if (chucVuSelect && chucVuSelect.options.length === 0) {
        ["Giám đốc", "Trưởng Phòng", "Nhân Viên"].forEach(cv => {
            const opt = document.createElement("option");
            opt.value = cv;
            opt.textContent = cv;
            chucVuSelect.appendChild(opt);
        });
    }

    if (!document.getElementById("tongLuongTheoChucVu")) {
        const div = document.createElement("div");
        div.id = "tongLuongTheoChucVu";
        document.body.appendChild(div);
    }
    // Gắn sự kiện cho các nút
    document.getElementById("btnThemNV").onclick = window.themNhanVien;
    document.getElementById("btnCapNhat").onclick = window.capNhatNhanVien;
    document.getElementById("btnTimNV").onclick = window.timNhanVienTheoLoai;
});

// Lần đầu load table rỗng
renderTable(dsNhanVien);
