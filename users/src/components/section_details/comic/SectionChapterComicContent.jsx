function SectionChapterComicContent({ data }) {
    
  return (
    <>
      <div className="chapter-content flex flex-col mb-3">
        <div
          className="visible-md visible-lg ads-responsive incontent-ad"
          id="ads-chapter-pc-top"
          align="center"
          style={{ height: "90px" }}
        ></div>

        <div className="py-2 flex flex-col items-center justify-center" >
            {data.chapter_image.map((item)=>{
                return(
                    <div key={item.image_page}><img className="mt-2" src={`https://sv1.otruyencdn.com/${data.chapter_path}/${item.image_file}`} alt="" /></div>
                )
            })}
        </div>
      </div>
    </>
  );
}

export default SectionChapterComicContent;
