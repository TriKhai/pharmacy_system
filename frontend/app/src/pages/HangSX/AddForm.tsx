import { useState } from "react";

type Field<T> = {
  label: string;
  name: keyof T;
  type?: string;
  required?: boolean;
};

type Props<T> = {
  title: string;
  fields: Field<T>[];
  isOpen: boolean;
  onSubmit: (formData: T) => Promise<void>;
  onClose: () => void;
};

const AddForm = <T extends object>({ title, fields, isOpen, onSubmit, onClose }: Props<T>) => {
  const [formData, setFormData] = useState<Partial<T>>({});

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate required fields
    const isValid = fields.every((field) => !field.required || formData[field.name]);
    if (!isValid) {
      alert("Vui lòng điền đầy đủ các trường bắt buộc!");
      return;
    }

    try {
      await onSubmit(formData as T); // Safe cast after validation
      setFormData({});
      onClose();
    } catch (error) {
      console.error("Lỗi khi gửi form:", error);
      alert("Không thể gửi dữ liệu. Vui lòng thử lại!");
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-lg">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">{title}</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-black">
            ×
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {fields.map((field, index) => (
            <div key={index}>
              <label className="block mb-1 font-medium">{field.label}</label>
              <input
                type={field.type || "text"}
                name={String(field.name)}
                required={field.required}
                value={String(formData[field.name] ?? "")}
                onChange={handleChange}
                className="border px-3 py-2 rounded w-full"
              />
            </div>
          ))}

          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-300 text-black px-4 py-2 rounded hover:bg-gray-400"
            >
              Hủy
            </button>
            <button
              type="submit"
              className="bg-[#12B0C2] text-white px-4 py-2 rounded hover:bg-[#0E8DA1]"
            >
              Lưu
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddForm;