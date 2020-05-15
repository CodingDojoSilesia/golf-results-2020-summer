import sys
a,b,c=sys.argv
s=(1,0),(-1,0),(0,1),(0,-1)
i=int
p=[[i(p),i(q),r,i(m),(i(p)<<2)^7*(i(q)<<3)^5,0] for p,q,r,m in c.split(',')]
for _ in[0]*i(b):
 for r in p:
  r[5]+=1;b,c,d,e,f,g=r;r[2]=[d,"R"][[d,g]==["S",14]];f^=f<<13;f^=f>>17;f^=f<<5;r[4]=f%(1<<30);l,m=s[r[4]%4];z=[(b+l)%8,(c+m)%8]
  if~-(e or any(_[:2]==z for _ in p)):r[:2]=z
  if d=="H"and any({abs(r[0]-x),abs(r[1]-y)}in({1,0},{1,1},{7,0},{7,1})for x,y in(_[:2]for _ in p if _[2]=="S")):r[2]="S";r[5]=0
l=eval(str(8*[['.']*8]))
for h in p:l[h[1]][h[0]]=h[2]
print('\n'.join(''.join(x)for x in l))