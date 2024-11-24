import SectionStoryDone from "./SectionStoriesDone";
import SectionNovelHot from "./SectionNovelsHot";
import SectionStoriesNew from "./SectionStoriesNew";

function SectionIndex() {
  return (
    <>
      <SectionNovelHot />
      <SectionStoriesNew />
      <SectionStoryDone />
    </>
  );
}

export default SectionIndex;
