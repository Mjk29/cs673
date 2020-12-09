require 'socket'

puts Process.pid
server = TCPServer.new 5687

server2 = TCPServer.new 5688

server3 = TCPServer.new 5689

server4 = TCPServer.new 5690

session = server.accept
session2 = server2.accept
session3 = server3.accept
session4 = server4.accept


