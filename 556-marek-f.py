import sys
R=range
X='S'
I=int
_,e,f=sys.argv
z=[[(I(a),I(b)),c,d,I(a)<<2^7*(I(b)<<3)^5,14]for a,b,c,d in f.split(',')]
for i in R(I(e)):
	for p in z:
		(x,y),b,c,d,e=p
		if b==X:p[4]-=1
		if p[4]==0:p[1]='R'
		d^=d<<13;d^=d>>17;d^=d<<5;p[3]=d%(1<<30);n=p[3]%4;f=[[x-1,x][n!=1],x+1][n==0]%8,[[y-1,y][n!=3],y+1][n==2]%8
		if(c!='1')*all(f!=o[0]for o in z):p[0]=f
		j,k=p[0]
		if b=='H'*any(u==X*(o in[~-j%8,j,-~j%8])*(e in[~-k%8,k,-~k%8])for(o,e),u,*_ in z):p[1]=X
for i in R(64):print(next((m[1]for m in z if m[0]==(i%8,I(i/8))),'.'),end=['','\n'][i%8==7])