<!-- Udah setup database pada tanggal : 03 - 11 - 2022 -->

<!--
ENDPOINT :

customer ==>


servicer ==>

Courier ===>
http://localhost:3000/courier/ -> ini cuman untuk cek kurir, ga dipake juga gapapa, dan juga ada beberapa endpoint di customer, crud nya

Customer
1. customer register =>  http://localhost:3000/customer/register
    - customer menginput data untuk mendafatar sebagai customer
    - customer mengisi table User
    - diisini untuk location masih hardcode
    - belum ada relasi table juga

2. customer login =>  http://localhost:3000/customer/login
    - customer login dan mendapatkan access token
    - disini belum ada authentication, di endpoint nya
    - belum ada relasi table

3. customer melakukan transaksi => http://localhost:3000/transaction
    - disini customer melakukan transaksi, dengan mengisi table transaksi
    - saat transaksi kita juga mengurangi balance sesuai berapa total price yg dibuat
    - dan menyimpan total price tersebut di dalam table balancemutation
    - juga belum ada sequelize transaction, supaya apabila salah satu proses gagal, maka roleback
    - jadi disini, transaksi => total price => mengurangi balance => dan masuk ke dalaam table mutation untuk dihold dahulu
    - dan si pemilik fotocopy dapat notif
    - saat create status default pending
    - diisni untuk harga perlembar masih hardcode
    - untuk harga jilid juga masih hardcode
    - jumlah pages juga masih hardcode
    - url dari file juga masih harcode dan tidak bisa di proses
    - disini belum ada relasi table
    - disini nanti user bisa memilih kurir dengan menginput courier id dan masih hardcode juga


    Servicer
1. servicer register =>  http://localhost:3000/servicer/register
    - saat register servicer mengisi table user
    - dan juga mengisi table ATK
    - disini belum pake sequelize transaction juga, untuk nge handle roleback
    - disini juga belum ada relasi table sama sekali
    - dan disini juga masih banyak yg hardcode seperti dari req.user.id yg biasa kita taruh di authen belum ada
    - disini juga belum ada location, masih hardcode

2. servier login => http://localhost:3000/servicer/login
    - saat login, seperti biasa, belum ada authen juga, belum ada author juga
    - setelah login, servicer bisa menambahkan kurir
    - untuk nambah kurir, di model belum ke handle, seperti IsEmail, dan Unique

Courier =>
1. courier register => http://localhost:3000/courier/register
    - si pemilik atk menngisi table kurir
    - di model belum ke handle semua
    - dan juga masih ada inputan yg masih hardcode
    - belum ada relasi juga pastinya

2. courier login => http://localhost:3000/courier/login
    - disini belum ada ke handle di handleError di middleware
    - masih bisa login dengan email yg sama dan tidak format email
    - belum ada relasi juga pastinya

=== > untuk ubah status nya ada juga di transaction
    disana kalau status nya di ubah menjadi progres, berarti proses lanjut
    kalau di ubah jadi reject, balance customer nya nambah lagi
    dan tadi udah buat untuk done
    tapi belum ke handle untuk masukin uang nya ke pihak ATK
 -->

<!--
1. di transaction harus di pisah per customer, user, dan courier karena supaya bisa pasang athen untuk mendapatkan authen

2. untuk multer besok harus udah singkron
-->


<!-- YANG KURANG ERROR HANDLER:
1. FUNGSI UBAH STATUS
 -->