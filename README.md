# task1
วิธีใช้งาน

npm install
docker-compose up เพื่อสร้าง Container
docker-compose dow เพื่อลบ Container และลบ image ที่เชื่อมกับ Container หลัก
# ทดสอบด้วย Postman

# Express.js 
กำหนดพอร์ตที่ 3000 เพื่อรอการร้องขอ HTTP
code:
const express = require("express");
const app = express();
const port = 3000;
# เลือกใช้ Middleware เพื่ออนุญาตการร้องขอจากโดเมนที่แตกต่าง และเพื่อให้ Express ทำการแปลงข้อมูลที่รับเข้าในรูปแบบ JSON
code:
app.use(cors());

-----------------------
app.use(express.json());

# URI ของ MongoDB กับ พอร์ตที่กำหนด 
code: 
const { MongoClient } = require("mongodb");
const uri = "mongodb://task_username:task2@mongodb:27017";
const database = "database";

------------------------------------
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
# ฟังก์ชัน connectToDatabase() เพื่อทำการเชื่อมต่อกับฐานข้อมูล MongoDB และเปิดการใช้งานฐานข้อมูล
code: 
async function connectToDatabase() {
  const client = new MongoClient(uri);
  await client.connect();
  const db = client.db(database);
  return { client, db };
}
# กำหนดตัวแปรสำหรับสร้างข้อมูลผู้ใช้งาน (/users/create) โดยใช้ app.post() และทำการตรวจสอบข้อมูลผู้ใช้ก่อนที่จะเพิ่มลงในฐานข้อมูล
code: และข้อมูลที่เก็บมี
app.post("/users/create", async (req, res) => {

  // ตรวจสอบข้อมูลผู้ใช้และความถูกต้อง

  // เชื่อมกับฐานข้อมูล

  // ตรวจสอบความซ้ำกันของ ID

  // บันทึกผู้ใช้ลงในฐานข้อมูล

  // ส่งคำตอบกลับ

});
# get users / put  (/users/update) / post (/users/login) และ delete(/users/delete) 
code:
app.get("/users", async (req, res) => {

  // เชื่อมกับฐานข้อมูล

  // ดึงข้อมูลผู้ใช้ทั้งหมด

  // ปิดการเชื่อมต่อกับฐานข้อมูล

  // ส่งข้อมูลผู้ใช้กลับไป

});

----------------------------------
app.get("/users/:id", async (req, res) => {

  // ดึง ID จากพารามิเตอร์

  // ตรวจสอบความถูกต้องของ ID

  // เชื่อมกับฐานข้อมูล

  // ดึงข้อมูลผู้ใช้ด้วย ID

  // ปิดการเชื่อมต่อกับฐานข้อมูล

  // ส่งข้อมูลผู้ใช้กลับไป

});

---------------------------------
app.put("/users/update", async (req, res) => {

  // ตรวจสอบข้อมูลผู้ใช้และความถูกต้อง

  // เชื่อมกับฐานข้อมูล

  // อัปเดตข้อมูลผู้ใช้ด้วย ID

  // ตรวจสอบผลลัพธ์และส่งคำตอบกลับ

});

-------------------------------

app.post("/users/login", async (req, res) => {

  // ตรวจสอบข้อมูลผู้ใช้และความถูกต้อง

  // เชื่อมกับฐานข้อมูล

  // ค้นหาผู้ใช้โดยอีเมลและรหัสผ่าน

  // ตรวจสอบผลลัพธ์และส่งคำตอบกลับ

});

-----------------------------

app.post("/users/logout", async (req, res) => {

  // ส่งคำตอบออกจากระบบกลับ
});

----------------------------
app.delete("/users/delete", async (req, res) => {

  // ตรวจสอบความถูกต้องของ ID

  // เชื่อมกับฐานข้อมูล

  // ค้นหาผู้ใช้ด้วย ID

  // ตรวจสอบผลลัพธ์และลบผู้ใช้

  // ส่งคำตอบกลับ

});
