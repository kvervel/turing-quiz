import os, sys

genfile = sys.argv[1]
checkfile = sys.argv[2]

checklist = []
genlist = []

subitemlist = []

isbirdlist = []
partbirdlist = []

with open(checkfile, 'r') as file:
	for line in file:
		current = line[:-1]
		checklist.append(current)

with open(genfile, 'r') as file:
	for line in file:
		current = line[:-1]
		genlist.append(current)

print('Number of generated names:', len(genlist))

i = 0
listlength = len(genlist)

for it in range(listlength):	
	if genlist[i] in checklist:
		#print(genlist[i], 'is in checklist')
		isbirdlist.append(genlist[i])
		genlist.pop(i)
	else:
		i = i + 1
	
print('Number of duplicate names:', len(isbirdlist))
print('Number of unique names:', len(genlist))

for item in checklist:
	newitem = item.split()
	for subitem in newitem:
		subitemlist.append(subitem)

i = 0
j = 0
listlength = len(genlist)

for it in range(listlength):
	genitemlist = genlist[i].split()
	j = 0
	for jit in range(len(genitemlist)):
		#print(genitemlist[j] in checklist)
		if genitemlist[j] in subitemlist:
			partbirdlist.append(genlist[i])
			genlist.pop(i)
			i = i - 1
			break
		j = j + 1
	i = i + 1

print('Number of part duplicate names:', len(partbirdlist))
print('Number of wholly unique names:', len(genlist))

print('-----')
print('Wholly unique names:')
for item in genlist:
	print(item)

f, e = os.path.splitext(genfile)
f = f + "_duplicates" + e
textfile = open(f, "w+")

textfile.write("Duplicate names: \r\n")
for item in isbirdlist:
	textfile.write("{!s}\r\n".format(item))

textfile.write("\r\nPart duplicate names:\r\n")
for item in partbirdlist:
	textfile.write("{!s}\r\n".format(item))

textfile.write("\r\nUnique names:\r\n")
for item in genlist:
	textfile.write("{!s}\r\n".format(item))

