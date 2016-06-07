def format_line(line)
  line.gsub!('"', '\"')
  line.gsub!("\r\n", "")
  return "\"#{line}\\n\"+"
end
File.open('superstructure.csv').each {|x| puts format_line(x) }
