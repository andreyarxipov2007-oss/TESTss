#!/bin/bash
if [ -t 0 ]; then
	echo "Введите текст:"
	read text;
else
	text=$(cat)
fi
count=0
n=${#text}
i=0
while [ $i -lt $n ]; do
	c="${text:$i:1}"
	if [[ "$c" == " " ]]; then
		count=$((count + 1))
	fi
	i=$((i + 1))
done
echo "Количество пробелов: $count"
