#!/usr/bin/env python3
"""
Enhanced script to convert images to WebP format with optimization
"""

import os
import sys
from pathlib import Path
from PIL import Image
import argparse

def convert_to_webp(input_path, output_path, quality=75, max_width=800, max_height=600):
    """Convert an image to WebP format with resizing and optimization"""
    try:
        with Image.open(input_path) as img:
            # Convert to RGB if necessary
            if img.mode in ('RGBA', 'LA', 'P'):
                img = img.convert('RGBA')
            else:
                img = img.convert('RGB')
            
            # Resize if dimensions are specified
            if max_width or max_height:
                original_size = (img.width, img.height)
                img.thumbnail((max_width or img.width, max_height or img.height), Image.Resampling.LANCZOS)
                print(f"  Resized: {original_size} -> {img.size}")
            
            # Save as WebP with optimization
            img.save(output_path, 'WEBP', quality=quality, method=6, optimize=True)
            file_size = os.path.getsize(output_path) / 1024  # KB
            print(f"✓ Converted: {input_path} -> {output_path} ({img.size[0]}x{img.size[1]}, {file_size:.1f}KB)")
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
    parser = argparse.ArgumentParser(description='Convert images to WebP format with optimization')
    parser.add_argument('--directory', '-d', default='.', help='Directory to search for images')
    parser.add_argument('--quality', '-q', type=int, default=75, help='WebP quality (1-100)')
    parser.add_argument('--delete-old', action='store_true', help='Delete original images after conversion')
    parser.add_argument('--max-width', type=int, default=800, help='Maximum width for converted images')
    parser.add_argument('--max-height', type=int, default=600, help='Maximum height for converted images')
    parser.add_argument('--force', action='store_true', help='Force conversion even if WebP exists')
    
    args = parser.parse_args()
    
    directory = Path(args.directory)
    if not directory.exists():
        print(f"Error: Directory {directory} does not exist")
        sys.exit(1)
    
    # Find all images
    images = find_images(directory)
    print(f"Found {len(images)} images to convert")
    print(f"Settings: max_width={args.max_width}, max_height={args.max_height}, quality={args.quality}")
    
    converted_count = 0
    failed_count = 0
    skipped_count = 0
    total_original_size = 0
    total_compressed_size = 0
    
    for image_path in images:
        # Generate output path
        webp_path = image_path.with_suffix('.webp')
        
        # Skip if WebP already exists and is newer (unless force is used)
        if not args.force and webp_path.exists() and webp_path.stat().st_mtime > image_path.stat().st_mtime:
            print(f"- Skipping (WebP newer): {image_path}")
            skipped_count += 1
            continue
        
        # Get original file size
        original_size = os.path.getsize(image_path) / 1024  # KB
        total_original_size += original_size
        
        # Convert image
        if convert_to_webp(image_path, webp_path, args.quality, args.max_width, args.max_height):
            converted_count += 1
            
            # Get compressed file size
            if webp_path.exists():
                compressed_size = os.path.getsize(webp_path) / 1024  # KB
                total_compressed_size += compressed_size
                savings = original_size - compressed_size
                print(f"  Size reduction: {original_size:.1f}KB -> {compressed_size:.1f}KB (saved {savings:.1f}KB, {savings/original_size*100:.1f}%)")
            
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
    print(f"  Skipped: {skipped_count}")
    print(f"  Total: {len(images)}")
    
    if total_original_size > 0 and total_compressed_size > 0:
        total_savings = total_original_size - total_compressed_size
        print(f"\nSize optimization:")
        print(f"  Original total: {total_original_size:.1f}KB")
        print(f"  Compressed total: {total_compressed_size:.1f}KB")
        print(f"  Total savings: {total_savings:.1f}KB ({total_savings/total_original_size*100:.1f}%)")

if __name__ == '__main__':
    main()
