export async function handleImageUpload(file: File) {
  if (!file) {
    console.error("No file selected");
    return;
  }

  const formData = new FormData();
  formData.append("file", file);

  try {
    const response = await fetch("/api/upload", {
      method: "POST",
      body: formData,
    });

    if (response.ok) {
      const result = await response.json();
      return result;
    } else {
      return {
        success: false,
      };
    }
  } catch {
    return {
      success: false,
    };
  }
}
