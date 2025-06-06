//tao doi tuong food list
class ListNhanVien {
    constructor(){
        this.arr = [];
    }
    addNhanVien(nhanVien) {
        this.arr.push(nhanVien);
    }
    editNhanVien(index, nhanVien) {
        if (index >= 0 && index < this.arr.length) {
            this.arr[index] = nhanVien;
        }
    }
    removeNhanVien(index) {
        if (index >= 0 && index < this.arr.length) {
            this.arr.splice(index, 1);
        }
    }
    updateNhanVien(index, nhanVien) {
        this.editNhanVien(index, nhanVien);
    }
    filterNhanVien(predicate) {
        return this.arr.filter(predicate);
    }

}
export default ListNhanVien;