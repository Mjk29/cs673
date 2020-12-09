require 'socket'
# server = TCPServer.new 5687
# session = server.accept
require 'json'

# processSocket = 5687

# wil need to create a new process log to store following data
# the pid for killing 
# the port to know where the php will redirect to
# can styore this into a file in same directory

# puts Process.pid



# puts processInfo






# file = File.open "currentServer.json"
# data = JSON.load file

# puts data





# session.close


def updateCurrentServerFile processPortNum

	# hostname = `hostname`

	processInfo = {
		"pid" => Process.pid,
		"socket" => processPortNum,
		"startTime" => Time.now,
		"hostname" => `hostname`.strip,
		"redirectString" => `hostname`.strip+':'+processPortNum.to_s
	}
	puts processInfo.inspect

	File.open("currentServer.json","w+") do |f|
		f.write(processInfo.to_json)
	end


	File.open("serverStartupLog.json","a+") do |f|
		f.write(processInfo.to_json)
		f.write("\n")
	end

	
end



def findOpenPort
	# attempt to start process on an open port
	# its possible that the default port will be stuck or in use by another program
	# need to try multiples until a useable one is found
	
	defaultPort = 5687

	# execute command to get a string of all ports currently in use on the machine
	portString = `netstat -lnt | awk 'NR>2{print $4}' | grep -E '(0.0.0.0:|:::)' | sed 's/.*://' | sort -n | uniq`
	# split string into list
	portList = portString.split("\n")

	# check if the list conitains the default port
	# if it does, increment the port by 1 until a unused port is found then return number
	if portList.include? defaultPort.to_s
		availPort = false
		while availPort == false
			defaultPort +=1
			if portList.include? defaultPort.to_s
			else
				availPort = true
			end				
		end
	end
	return defaultPort
end



def startListener processPortNum


	server = TCPServer.open(processPortNum)    # Socket to listen on port 2000
	loop {                           # Servers run forever
		client = server.accept        # Wait for a client to connect
		client.puts(Time.now.ctime)   # Send the time to the client
		client.puts "Closing the connection. Bye!"
		client.close                  # Disconnect from the client
	}


	# server = TCPServer.new processPortNum
	

	# while true
	#   request = session.gets.chomp
	#   puts "They said \"#{request}\"" # the server logs each response
	#   session.puts "But why did you say \"#{request}\"?" # but it's not too bright
	# end


	# loop do
	# 	Thread.start(server.accept) do |client|
	# 		client.puts "Hello !"
	# 		client.puts "Time is #{Time.now}"
	# 		client.close
	# 	end
	# end

end



def main
	puts "HERE IS MAIN"
	processPortNum = findOpenPort()

	# sleep(36000)
	updateCurrentServerFile(processPortNum)

	listenerThread = Thread.new{startListener(processPortNum)}
	puts listenerThread
	listenerThread.join
	





end



if __FILE__ == $PROGRAM_NAME
	main()
end


