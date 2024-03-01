import styled from "styled-components";
import MainContainer from "../MainContainer";
import { COLORS } from "../../constants";

const users = [
  { id: 1, imgSrc: "https://images.mcpepes.com/7f7b00fa478aaaf5a16803563d87fd9d59e6db41f158e3547397780af9b60d40.gif", name: "dave" },
  { id: 2, imgSrc: "https://images.mcpepes.com/7f7b00fa478aaaf5a16803563d87fd9d59e6db41f158e3547397780af9b60d40.gif", name: "clay" },
  { id: 3, imgSrc: "https://images.mcpepes.com/7f7b00fa478aaaf5a16803563d87fd9d59e6db41f158e3547397780af9b60d40.gif", name: "matt" },
];

interface MessageboardProps {
    aboutme: string;
    interests: string;
  }

  export function Messageboard({ aboutme, interests }: MessageboardProps) {
  return (
    <>
      <MainContainer>
        <Head>
          <LeftCell>
            <BioSection>
              <SectionHeading>About me:</SectionHeading>
              <SectionText>
              {aboutme}
              </SectionText>
            </BioSection>
            <BioSection>
              <SectionHeading>Interest:</SectionHeading>
              <SectionText>
                {interests}
              </SectionText>
            </BioSection>
          </LeftCell>
          <RightCell>
            <FriendsList>
              <WidgetHeader>Friends</WidgetHeader>
              <div>
                {users.map((user) => (
                  <UserProfileContainer>
                  <UserImage src={user.imgSrc} alt="User profile" />
                  <UserName>{user.name}</UserName>
                </UserProfileContainer>
                ))}
              </div>
              <StyledViewAllFriends>View All</StyledViewAllFriends>
            </FriendsList>
          </RightCell>
        </Head>
      </MainContainer>
    </>
  );
}


const Head = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 15px;
`;

const LeftCell = styled.div`
  background-color: ${COLORS.white};
  border: 1px solid ${COLORS.secondary};
  border-radius: 10px;
  width: 100%;
`;

const RightCell = styled.div`
  background-color: ${COLORS.white};
  border: 1px solid ${COLORS.secondary};
  padding: 0px;
  font-weight: bold;
  border-radius: 10px;
  padding: 15px 20px;
  box-sizing: border-box;
`;

const FriendsList = styled.div`
    width: 150px;
`;

const WidgetHeader = styled.header`
  color: ${COLORS.black};
  font-size: 16px !important;
  padding: 10px 0;
  text-align: left;
  margin-bottom: 10px;
`;

const StyledViewAllFriends = styled.header`
  color: ${COLORS.black};
  font-weight: normal;
  opacity: 50%;
  text-decoration: underline;
  font-size: 14px !important;
  padding: 10px 0;
  text-align: Center;
  margin-bottom: 10px;
  margin-top: 10px;
`;


const BioSection = styled.div`
  padding: 15px;
`;

const SectionHeading = styled.h2`
  color: ${COLORS.black};
  margin-bottom: 10px;
  font-size: 1.17em !important;
`;

const SectionText = styled.p`
  color: ${COLORS.black};
  font-size: 14px;
`;

const UserProfileContainer = styled.div`
    background-color: ${COLORS.buttons.secondary};
  display: flex;
  align-items: center;
  box-sizing: border-box;
  padding: 5px 10px 5px 10px;
  margin-bottom: 10px;
  border-radius: 5px;
`;

const UserImage = styled.img`
  background-color: ${COLORS.black};
  width: 30px;
  height: 30px;
  border-radius: 50%;
  margin-right: 10px;
`;

const UserName = styled.span`
  font-size: 14px;
  font-weight: normal;
  color: ${COLORS.black};
`;