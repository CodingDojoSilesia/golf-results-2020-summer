import sys
_,N,L=sys.argv
B=[]
P=[]
for _ in[1]*8:B+=[*'.'*8],
for x,y,s,q in L.split(','):P+=[x:=int(x),y:=int(y),x*4^56*y^5,s,0,q],;B[y][x]=s
for _ in s*int(N):
 for p in P:
  x,y,n,s,c,q=p;n^=n<<13;n^=n>>17;n^=n<<5;z=1-2*(n%2);u,w=[x,y+z&7]if n&2else[x+z&7,y]
  if'R'<s:c+=1
  if c>13:s='R'
  if('1'>q)*'/'>B[w][u]:B[y][x]='.';x,y=u,w
  if('I'>s)*[1for k in b"701"if'S'in(B[y+k&7]*3)[x+7:][:3]]:s='S'
  p[:5]=x,y,n%(1<<30),s,c;B[y][x]=s
for b in B:print(''.join(b))