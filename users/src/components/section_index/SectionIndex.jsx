import SectionStoryDone from "./SectionStoriesDone";
import SectionStoriesHot from "./SectionStoriesHot";
import SectionStoriesNew from "./SectionStoriesNew";

function SectionIndex() {
  return (
    <>
      <SectionStoriesHot />
      <SectionStoriesNew />
      <SectionStoryDone />
    </>
  );
}

export default SectionIndex;
