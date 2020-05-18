d=ARGV[1].split(",").map{|l|x=l[0].to_i;y=l[1].to_i;[x+y*16,l[2]=="H"?0:l[2]=="S"?2:16,l[3]!="1",x*4^56*y^5]}
d.cycle(ARGV[0].to_i){|k|a,b,c,n=k
n^=n<<13
n^=n>>17
n^=n<<5
n%=1<<30
k[3]=n
z=[1,7,16,112,17,23,113,119]
p=(a+z[n%4])&119
k[0]=e=c&d.all?{|l,|l!=p}?p:a
k[1]=[b>0?b+1:d.any?{|l,m|m&15>0&&z.any?{|o|(e+o)&119==l}}?2:0,16].min}
(0..120).map{|i|a,b=d.find{|k,|k==i}
print i&8>0?i&7>0?"":"\n":a ?b>15?"R":b>0?"S":"H":"."}