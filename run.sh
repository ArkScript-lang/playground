if [ -f log.txt ]; then
	count=$(ls -l . | egrep -c '^-.+log-.+\.txt')
	mv log.txt log-$count.txt
fi

mkdir -p /tmp/playground
node app.js |& tee log.txt
