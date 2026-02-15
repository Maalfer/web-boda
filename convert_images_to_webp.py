#!/usr/bin/env python3
"""
Script to convert all images in the project to WebP format
"""

import os
import sys
from pathlib import Path
from PIL import Image
import argparse

def convert_to_webp(input_path, output_path, quality=85):
    """Convert an image to WebP format"""
    try:
        with Image.open(input_path) as img:
            # Handle transparency for PNG files
            if img.mode in ('RGBA', 'LA', 'P'):
                img = img.convert('RGBA')
            else:
                img = img.convert('RGB')
            
            # Save as WebP
            img.save(output_path, 'WEBP', quality=quality, method=6)
            print(f"✓ Converted: {input_path} -> {output_path}")
            return True
    except Exception as e:
        print(f"✗ Error converting {input_path}: {e}")
        return False

def find_images(directory):
    """Find all image files in directory"""
    image_extensions = {'.png', '.jpg', '.jpeg', '.gif', '.bmp', '.tiff'}
    images = []
    
    for root, dirs, files in os.walk(directory):
        # Skip node_modules and .git directories
        if 'node_modules' in dirs:
            dirs.remove('node_modules')
        if '.git' in dirs:
            dirs.remove('.git')
        if '__pycache__' in dirs:
            dirs.remove('__pycache__')
        if 'dist' in dirs:
            dirs.remove('dist')
        
        for file in files:
            file_path = Path(root) / file
            if file_path.suffix.lower() in image_extensions:
                images.append(file_path)
    
    return images

def main():
    parser = argparse.ArgumentParser(description='Convert images to WebP format')
    parser.add_argument('--directory', '-d', default='.', help='Directory to search for images')
    parser.add_argument('--quality', '-q', type=int, default=85, help='WebP quality (1-100)')
    parser.add_argument('--delete-old', action='store_true', help='Delete original images after conversion')
    
    args = parser.parse_args()
    
    directory = Path(args.directory)
    if not directory.exists():
        print(f"Error: Directory {directory} does not exist")
        sys.exit(1)
    
    # Find all images
    images = find_images(directory)
    print(f"Found {len(images)} images to convert")
    
    converted_count = 0
    failed_count = 0
    
    for image_path in images:
        # Generate output path
        webp_path = image_path.with_suffix('.webp')
        
        # Skip if WebP already exists and is newer
        if webp_path.exists() and webp_path.stat().st_mtime > image_path.stat().st_mtime:
            print(f"- Skipping (WebP newer): {image_path}")
            continue
        
        # Convert image
        if convert_to_webp(image_path, webp_path, args.quality):
            converted_count += 1
            
            # Delete original if requested
            if args.delete_old:
                try:
                    image_path.unlink()
                    print(f"  Deleted original: {image_path}")
                except Exception as e:
                    print(f"  Warning: Could not delete {image_path}: {e}")
        else:
            failed_count += 1
    
    print(f"\nConversion complete:")
    print(f"  Converted: {converted_count}")
    print(f"  Failed: {failed_count}")
    print(f"  Total: {len(images)}")

if __name__ == '__main__':
    main()
