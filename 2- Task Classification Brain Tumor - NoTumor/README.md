# Brain Tumor Classification (ResNet50)

## Overview
Deep learning project using transfer learning (ResNet50) to classify MRI images into:
- Glioma
- Meningioma
- Pituitary
- No Tumor

## Requirements
- Python 3.8+
- tensorflow, keras
- numpy, pandas
- matplotlib
- opencv-python

Install:
pip install numpy pandas opencv-python matplotlib tensorflow keras

## Dataset Structure
dataset/
 ├── Training/
 └── Testing/
     ├── glioma/
     ├── meningioma/
     ├── notumor/
     └── pituitary/

## Model
- Base: ResNet50 (pretrained)
- Head: Dense + Dropout + Softmax (4 classes)

## Training
- Epochs: 200
- Batch size: 16
- Input: 224x224

## Run
1. Set dataset paths in notebook
2. Add pretrained weights file
3. Run:
jupyter notebook brain-tumor-pretrained.ipynb

## Notes
- Use class_mode='sparse' (not binary)
- Consider fine-tuning last layers for better accuracy

## Output
- model_brain_tumor.h5

## data used from kaggle
  **[first data](https://www.kaggle.com/datasets/masoudnickparvar/brain-tumor-mri-dataset)**
  **[second data](https://www.kaggle.com/datasets/sartajbhuvaji/brain-tumor-classification-mri)**
