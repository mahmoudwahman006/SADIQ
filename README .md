# 🧠 Brain Tumor Detection & Segmentation System

> An end-to-end deep learning pipeline for brain tumor detection, classification, and segmentation from MRI scans — built as a graduation project.

---

## 📁 Repository Structure

```
├── 1- Task Classification Brain - No Brain im/
├── 2- Task Classification Brain Tumor - NoTu/
├── 3- Task Segmentation (UNET-VGG16)/
├── 4- Deployment-main/
├── Dataset/
├── Create_ImageJ_Mask.mp4
├── Demo.mp4
├── Graduation Project Documentation.pdf
├── .gitignore
└── LICENSE
```

---

## 📂 Folders & Files Explained

### `1- Task Classification Brain - No Brain im/`
**Brain vs. No-Brain Image Classifier**

A binary classification model that filters out non-brain (irrelevant) MRI scans before passing them to the downstream pipeline. Acts as the **first gate** in the system — ensuring only valid brain MRI images are processed.

- **Input:** Raw MRI image
- **Output:** Brain ✅ / Not a Brain ❌
- **Use:** Run this first to validate your input data

---

### `2- Task Classification Brain Tumor - NoTu/`
**Tumor vs. No-Tumor Classifier**

A binary classification model that determines whether a brain MRI contains a tumor. This is the **second stage** of the pipeline, operating only on confirmed brain scans.

- **Input:** Brain MRI image (passed from Task 1)
- **Output:** Tumor Detected ✅ / No Tumor ❌
- **Use:** Run after confirming a valid brain scan

---

### `3- Task Segmentation (UNET-VGG16)/`
**Tumor Segmentation using U-Net + VGG16**

A semantic segmentation model built on the **U-Net architecture with VGG16 as the encoder backbone**. It precisely localizes and segments the tumor region within the MRI scan by generating a pixel-level mask.

- **Input:** Brain MRI image confirmed to have a tumor
- **Output:** Segmentation mask highlighting the tumor area
- **Architecture:** U-Net decoder + VGG16 encoder (transfer learning)
- **Use:** Run after Task 2 confirms tumor presence

---

### `4- Deployment-main/`
**Web Application / Deployment Code**

Contains the full deployment-ready application that wraps all three models into a single user-facing interface. Upload an MRI scan and get end-to-end results: validation → classification → segmentation.

- **Stack:** *(e.g., Flask / Streamlit / FastAPI — update as needed)*
- **Use:** Follow the setup instructions inside this folder to run the app locally or deploy it

---

### `Dataset/`
**MRI Dataset**

Contains the dataset used for training, validation, and testing across all tasks. May include raw images, masks, and train/val/test splits.

> ⚠️ **Note:** Due to size constraints, the full dataset may not be included. Check the documentation for the original dataset source (e.g., Kaggle, BraTS).

---

### `Create_ImageJ_Mask.mp4`
**Tutorial: How to Create Ground Truth Masks Using ImageJ**

A video walkthrough showing how to manually annotate MRI images and generate segmentation masks using [ImageJ](https://imagej.nih.gov/ij/). Watch this if you want to create your own labeled data.

---

### `Demo.mp4`
**Full System Demo**

A recorded demonstration of the complete pipeline in action — from uploading an MRI scan to receiving the final segmentation output through the web interface.

---

### `Graduation Project Documentation.pdf`
**Full Technical Documentation**

The official graduation project report. Covers the problem statement, literature review, methodology, model architectures, results, and conclusions.

📖 **Read this first** for a deep understanding of the system design and experimental results.

---

## 🚀 Getting Started

Follow this order to understand or run the project:

1. 📖 Read `Graduation Project Documentation.pdf`
2. 🎥 Watch `Demo.mp4` to see the system in action
3. 🗂️ Explore the `Dataset/` folder and set up your data
4. 🧪 Run models in order: **Task 1 → Task 2 → Task 3**
5. 🌐 Launch the app from `4- Deployment-main/`

---

## 🧬 Pipeline Overview

```
Input MRI Scan
      │
      ▼
┌─────────────────────┐
│  Task 1: Is it a    │──── ❌ Not a Brain → Rejected
│  Brain Scan?        │
└─────────────────────┘
      │ ✅ Yes
      ▼
┌─────────────────────┐
│  Task 2: Is there   │──── ❌ No Tumor → Clean Scan
│  a Tumor?           │
└─────────────────────┘
      │ ✅ Yes
      ▼
┌─────────────────────┐
│  Task 3: Segment    │
│  the Tumor (U-Net)  │──── 🗺️ Tumor Mask Output
└─────────────────────┘
```

---

## 📋 Requirements

> See individual task folders for their specific `requirements.txt` or dependency files.

General dependencies likely include:
- Python 3.8+
- TensorFlow / Keras or PyTorch
- OpenCV
- NumPy, Matplotlib
- Flask / Streamlit *(for deployment)*

---

## 📄 License

This project is licensed under the terms specified in the [`LICENSE`](./LICENSE) file.

---

## 👨‍💻 Authors

*Graduation Project — [Your University Name]*  
*Add your team names and contact info here.*
