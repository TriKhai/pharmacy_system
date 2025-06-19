Start be

1. Chạy migrate database
```bash
python manage.py migrate
```

2. Tạo migration (nếu bạn có thay đổi models)
```bash
python manage.py makemigrations
```

3. Khởi động server
```bash
python manage.py runserver
```

4. Nạp dữ liệu vào db
```bash
python db_csv.py
```