# Brain Tumor Classification — Tumor vs. No Tumor

A deep learning image classification project that detects the presence of brain tumors in MRI scans using a fine-tuned **ResNet50** model built with TensorFlow/Keras.

---

## Overview

This project trains a binary image classifier to distinguish between two classes:

- **tumor** — MRI scan containing a brain tumor
- **no_tumor** — MRI scan with no tumor

The model uses **transfer learning** with a pre-trained ResNet50 backbone (ImageNet weights), followed by custom fully-connected layers. Data augmentation is applied during training to improve generalization.

---

## Project Structure

```
project/
│
├── Data/                   # Raw image dataset (organized by class)
│   ├── tumor/
│   └── no_tumor/
│
├── Train/                  # Auto-generated training split (80%)
├── Validation/             # Auto-generated validation split (~16%)
├── Test/                   # Auto-generated test split (~4%)
│
├── BrainTumor_Classification_256px.h5   # Saved best model checkpoint
└── Classification_tumor_no_tumor.ipynb  # Main notebook
```

---

## Pipeline

### 1. Data Preparation
- Images are read from the `Data/` directory and automatically split into **Train (80%)**, **Validation**, and **Test** sets using `os` and `shutil`.
- Images are expected to be organized into class subdirectories (`tumor/`, `no_tumor/`).

### 2. Data Augmentation
Applied via `ImageDataGenerator` with:
- Rescaling (`1/255`)
- Shear, zoom, and shift transformations
- Horizontal flip and rotation (up to 20°)

All images are resized to **256 × 256 pixels**.

### 3. Model Architecture
| Layer | Details |
|---|---|
| Base | ResNet50 (frozen, ImageNet weights) |
| Flatten | — |
| Dense | 256 units, ReLU |
| BatchNormalization | — |
| Dropout | 0.5 |
| Dense | 128 units, ReLU |
| BatchNormalization | — |
| Dropout | 0.5 |
| Output | 1 unit, Sigmoid (binary) |

- **Loss:** Binary Cross-Entropy  
- **Optimizer:** Adam  
- **Metric:** Accuracy

### 4. Training Callbacks
- **EarlyStopping** — monitors `val_loss`, patience of 10 epochs, restores best weights
- **ModelCheckpoint** — saves best model to `BrainTumor_Classification_256px.h5`
- **ReduceLROnPlateau** — reduces LR by factor 0.1 after 5 stagnant epochs (min LR: `1e-6`)

### 5. Evaluation
- Training/validation loss and accuracy curves are plotted.
- Confusion matrix and classification report generated on the test set.

### 6. Inference
A `preprocess_image()` function is provided to run prediction on a single MRI image:
```python
image_path = "Test/tumor/29.jpg"
preprocessed_image = preprocess_image(image_path)
prediction = model.predict(preprocessed_image)
predicted_class = (prediction > 0.5).astype(int)
# 0 = tumor, 1 = no_tumor
```

---

## Requirements

### Python Version
Python **3.8 – 3.11** (recommended)

### Install Dependencies

```bash
pip install -r requirements.txt
```

### `requirements.txt`

```
tensorflow>=2.10.0
numpy>=1.23.0
matplotlib>=3.5.0
scikit-learn>=1.1.0
Pillow>=9.0.0
```

> **Note:** TensorFlow includes Keras internally. No separate `keras` install is needed for TF 2.x.

---

## How to Run

1. **Prepare your dataset** — Place MRI images inside `Data/tumor/` and `Data/no_tumor/`.

2. **Run the notebook** — Open and execute all cells in `Classification_tumor_no_tumor.ipynb`:
   ```bash
   jupyter notebook Classification_tumor_no_tumor.ipynb
   ```

3. **Data split** — The notebook will automatically split `Data/` into `Train/`, `Validation/`, and `Test/` directories.

4. **Training** — The model trains for up to 100 epochs with early stopping.

5. **Evaluation** — Loss/accuracy curves and a confusion matrix are displayed after training.

6. **Inference** — Update `image_path` in the last cells to run predictions on new images.

---

## Notes

- The ResNet50 base is **frozen** during training (transfer learning without fine-tuning). You can unfreeze layers for fine-tuning by setting `base_model.trainable = True` and selectively freezing early layers.
- `batch_size` is set to `1` in the data generators — increasing it (e.g., to `32`) will significantly speed up training on GPU.
- The saved model file (`BrainTumor_Classification_256px.h5`) can be loaded independently for inference without retraining.
