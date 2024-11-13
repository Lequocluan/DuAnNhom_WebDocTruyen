function SectionChapperContent({ text }) {
  return (
    <>
      <div className="chapter-content mb-3">
        <div
          className="visible-md visible-lg ads-responsive incontent-ad"
          id="ads-chapter-pc-top"
          align="center"
          style={{ height: "90px" }}
        ></div>

        <div className="py-2">
          {text.map((line, index) => (
            <p key={index}>{line}</p>
          ))}
        </div>
      </div>
    </>
  );
}

export default SectionChapperContent;
