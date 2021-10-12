import styled from "styled-components";
import { PhotographIcon } from "@heroicons/react/solid";
import { useRef, useState } from "react";

function CreateStoryScreen() {
  const filepickerRef = useRef(null);
  const [imageToStory, setImageToStory] = useState(null);

  const addImagetoStory = (e) => {
    const reader = new FileReader();
    if (e.target.files[0]) {
      reader.readAsDataURL(e.target.files[0]);
    }

    reader.onload = (readerEvent) => {
      setImageToStory(readerEvent.target.result);
    };
  };
  return (
    <Container>
      <div className="flex flex-col h-full items-center justify-center">
        {!imageToStory ? (
          <CreateStoryWrap>
            <PhotoStory onClick={() => filepickerRef.current.click()}>
              <CreateStoryInput>
                <PhotographIcon className="icon2 shadow-xl" />
                <CreateStoryText>Create a Photo Story</CreateStoryText>
                <input
                  ref={filepickerRef}
                  type="file"
                  onChange={addImagetoStory}
                  hidden
                />
              </CreateStoryInput>
            </PhotoStory>
            <TextStory>
              <CreateStoryInput>
                <div className="icon2 shadow-xl">Aa</div>
                <CreateStoryText>Create a text Story</CreateStoryText>
              </CreateStoryInput>
            </TextStory>
          </CreateStoryWrap>
        ) : (
          <CreateStoryScreenContainer>
            <span className="pt-4 px-3 font-bold">Preview</span>
            <CreateStoryBlackContainer>
              <div className="flex flex-grow relative w-full">
                <StoryPreviewOutsideContainer>
                  <div
                    style={{ width: 423.562 }}
                    className="overflow-y-hidden overflow-x-hidden absolute h-full"
                  >
                    <StoryPreview></StoryPreview>
                  </div>
                  <div className="absolute top-1/2 left-1/2 h-full">
                    <StoryImageContainer>
                      <StoryImage>
                        <img
                          className="left-1/2 h-full border-0 translate-x-1/2"
                          src={imageToStory}
                          alt=""
                        />
                      </StoryImage>
                    </StoryImageContainer>
                  </div>
                </StoryPreviewOutsideContainer>

                <ImageInputRange></ImageInputRange>
              </div>
            </CreateStoryBlackContainer>
          </CreateStoryScreenContainer>
        )}
      </div>
    </Container>
  );
}

export default CreateStoryScreen;

const Container = styled.div`
  min-height: inherit;
  max-width: 100%;
  display: flex;
  flex-direction: column;
  flex-shrink: 1;
  flex-grow: 1;
  min-width: 0;
`;

const CreateStoryWrap = styled.div`
  display: flex;
  justify-content: space-between;
  width: 460px;
`;

const CreateStory = styled.div`
  background-image: url("/createStories/create-stories.png");
  background-size: auto;
  width: 220px;
  height: 330px;
  background-repeat: no-repeat;
  display: inline-block;
  filter: brightness(100%);

  &:hover {
    filter: brightness(95%);
  }
`;

const PhotoStory = styled(CreateStory)`
  background-position: 0px 0px;
`;

const TextStory = styled(CreateStory)`
  background-position: 0px -331px;
`;

const CreateStoryInput = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`;

const CreateStoryText = styled.div`
  color: white;
  margin-top: 10px;
  font-size: small;
  font-weight: bold;
`;

const CreateStoryScreenContainer = styled.div`
  background-color: white;
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  margin: 56px 32px 24px;
  max-width: calc(100% - 48px);
  min-height: 0;
  height: 100%;
  border-radius: 8px;
  flex-shrink: 1;
  width: 972px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.2); ;
`;

const CreateStoryBlackContainer = styled.div`
  flex-grow: 1;
  margin: 16px;
  overflow-y: hidden;
  border-radius: 8px;
  background-color: #18191a;
  display: flex;
`;

const StoryPreviewOutsideContainer = styled.div`
  height: calc(100% - 68px);
  position: absolute;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  top: 16px;
`;
const ImageInputRange = styled.div`
  height: 52px;
  background-color: #18191a;
  display: flex;
  justify-content: center;
  position: absolute;
  z-index: 1000;
  width: 100%;
  pointer-events: all;
  bottom: 0;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.2);
`;

const StoryPreview = styled.div`
  background-image: linear-gradient(
    rgb(253, 186, 203) 0%,
    rgb(210, 167, 215) 100%
  );
  width: 100%;
  height: 100%;
`;
const StoryImageContainer = styled.div`
  height: 100%;
  transform: translate(calc(-50% + 1.25543px), calc(-50% + -10.6875px))
    rotate(0deg) scale(0.37);
`;

const StoryImage = styled.div`
  min-height: 0;
  padding: 0;
  margin: 0;
  box-sizing: border-box;
  border-radius: inherit;
  display: inline-flex;

  flex-shrink: 0;
  cursor: pointer;
  flex-basis: auto;
  text-align: inherit;
  min-width: 0;
  align-items: stretch;
  background-color: transparent;
  touch-action: manipulation;
  z-index: 0;
  height: 100%;
  flex-direction: row;
  border-color: rgba(0, 0, 0, 0, 0.4);
  border-width: 0;
  border-style: solid;
  list-style: none;
  text-decoration: none;
  outline: none;
  pointer-events: all;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.2);
`;
