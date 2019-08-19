from PIL import Image
import os, sys

#get current working directory
cwd = os.getcwd()

#read the passed in arguments (images.txt and bounding_boxes.txt) to variables
ifile = sys.argv[1]
bfile = sys.argv[2]

#make two lists, one for the images.txt file and one for the bounding_boxes.txt file
ilist = []
blist = []

#convert the txt files to lists
with open(ifile, 'r') as file:
	for line in file:
		current = line[:-1]
		ilist.append(current)
		
with open(bfile, 'r') as file:
	for line in file:
		current = line[:-1]
		blist.append(current)
		
#go through every file in the current working directory
for root, dirs, files in os.walk(cwd):
	for file in files:
		f, e = os.path.splitext(file)
		
		outfile = f + "_cropped.jpg"
		
		#if the file is a jpg file, search for its name in the images.txt-list
		if file != outfile and e == ".jpg": 
			try:
				imgl = list(filter(lambda x: file in x, ilist))
				imgl = imgl[0].split()
				imgn = imgl[0]
				imgn = int(imgn) - 1
				
				#find the corresponding bounding box and split the line into floating point values
				boundl = blist[imgn].split()
				x = float(boundl[1])
				y = float(boundl[2])
				w = float(boundl[3])
				h = float(boundl[4])
				
				#load the image and crop it to the bounding box
				im = Image.open(file)
				box = (x, y, x + w, y + h)
				im = im.crop(box)
				
				im.save(outfile)
				
			except IOError:
				print(file, " not edited")
			
