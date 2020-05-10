k,a=$*
V=[]
8.times{V<<?.*8}
P=[]
a.split(?,).map{|l|P<<[x=l[0].to_i,y=l[1].to_i,V[y][x]=l[2],x*4^56*y^5,l[3],0]}
?1.upto(k){P.map{|p|u,w=(x,y,s,n,q=p)
s="R"if"R"<s&&13<p[5]+=1
n^=n<<13
n^=n>>17
n^=n<<5
z=1-2*n[0]
n&2>1?w+=z:u+=z
q<?1&&?/>V[w%=8][u%=8]&&[V[y][x]=?.,x=u,y=w]
s<?I&&3.times{|i|(V[7&y+i-1]*3)[x+7,3][?S]&&s=?S}
p[0,4]=x,y,V[y][x]=s,n%=1<<30}}
puts V