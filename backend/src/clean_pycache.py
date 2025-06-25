import os
import shutil

def remove_pycache_dirs(start_path='.'):
    """
    Xóa tất cả thư mục __pycache__ từ start_path trở xuống
    """
    count = 0
    for root, dirs, files in os.walk(start_path):
        if '__pycache__' in dirs:
            pycache_path = os.path.join(root, '__pycache__')
            shutil.rmtree(pycache_path)
            print(f"Đã xóa: {pycache_path}")
            count += 1
    if count == 0:
        print("Không tìm thấy thư mục __pycache__ nào.")
    else:
        print(f"Đã xóa tổng cộng {count} thư mục __pycache__.")

# Gọi hàm
remove_pycache_dirs()
