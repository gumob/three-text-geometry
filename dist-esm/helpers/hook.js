import{useLoader}from"@react-three/fiber";import useSWR from"swr";import{TextureLoader}from"three";import{BMFontAsciiParser}from"../parser";let useFont=(e,r)=>{var{data:t,isLoading:o}=useSWR(`/assets/bmfont/${e}-${r}.fnt`,e=>fetch(e).then(e=>e.text()).then(e=>(new BMFontAsciiParser).parse(e)));return{data:{font:t,texture:useLoader(TextureLoader,`/assets/bmfont/${e}-${r}.png`)},isLoading:o}};export{useFont};