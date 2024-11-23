function SectionChapterContent({ text }) {
  return (
    <>
      <div className="chapter-content mb-3">
        <div
          className="visible-md visible-lg ads-responsive incontent-ad"
          id="ads-chapter-pc-top"
          align="center"
          style={{ height: "90px" }}
        ></div>

        <div className="py-2" dangerouslySetInnerHTML={{ __html: text }}></div>
      </div>
    </>
  );
}

export default SectionChapterContent;
