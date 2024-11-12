export default {
  viewAll: {
    title: 'แบบฟอร์มการทดสอบ',
    searchFormPlaceHolder: 'ค้นหาแบบฟอร์มการทดสอบ',
    addButtonText: 'เพิ่มแบบฟอร์มการทดสอบ',
  },
  add: {
    title: 'สร้างแบบฟอร์มการทดสอบ',
    form: {
      name: {
        label: 'ชื่อฟอร์มการทดสอบ',
        placeholder: 'ระบุชื่อฟอร์มการทดสอบ (บังคับ)',
      },
      file: {
        label: 'ไฟล์เทมเพลตบันทึกผลการทดสอบ',
        placeholder: 'ยังไม่ได้เลือกไฟล์',
        button: 'เลือกไฟล์',
      },
      dataAreaTitle: 'ส่วนของข้อมูลที่ต้องการบันทึกลงฐานข้อมูล',
      dataArea: {
        sheet: {
          label: 'หน้าของข้อมูลในไฟล์ Excel (Sheet)',
          placeholder: 'ระบุชื่อหน้าของข้อมูลในไฟล์ (บังคับ)',
        },
        row: {
          title: 'แถวของข้อมูล',
          startLabel: 'เริ่มต้นที่แถว',
          endLabel: 'ถึงแถว',
          startPlaceholder: 'เช่น 10',
          endPlaceholder: 'เช่น 20',
        },
        column: {
          title: 'คอลัมน์ของข้อมูล',
          nameLabel: 'ชื่อคอลัมน์',
          typeLabel: 'ประเภทของข้อมูล',
          startLabel: 'คอลัมน์เริ่มต้น',
          endLabel: 'คอลัมน์สุดท้าย',
          namePlaceholder: 'ไม่จำเป็นต้องตรงกับชื่อในไฟล์',
          typePlaceholder: 'เลือกประเภทของข้อมูล',
          startPlaceholder: 'เช่น A',
          endPlaceholder: 'เช่น F',
          typeOptions: {
            text: 'ข้อความ',
            number: 'ตัวเลข',
          },
        },
        preview: {
          title: 'พรีวิวส่วนของข้อมูลที่ต้องการบันทึกลงฐานข้อมูล',
          placeholder: 'กรุณากรอกข้อมูลให้ครบเพื่อแสดงพรีวิว',
        },
      },
      submit: 'สร้างแบบฟอร์มการทดสอบ',
    },
  },
};
