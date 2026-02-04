if [ -f log.txt ]; then
	count=$(ls -l . | egrep -c '^-.+log-\d+\.txt')
	mv log.txt log-$count.txt
fi

node app.js |& tee log.txt
