#!/bin/bash
input="./spritesheets.txt"
while IFS= read -r line
do
  d=`dirname "$line"`
  f=`basename -- "$line"`
  if [ ! -f "$d/RPG_$f" ]; then
    #Change this line to modify the area cropped out of your spritesheet to make the new face image.
    convert -crop 45x62+12+14\! "$line" "$f"
    convert "$f" -scale 300% "$f"
    convert "$f" -background none -extent 576x288 "$f"
    echo "  Created:        $$f"
  else
    echo "  Already Exists: $$f"
  fi
done < "$input"
