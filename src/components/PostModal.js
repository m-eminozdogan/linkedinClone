import styled from 'styled-components'

const PostModal = (props) => {
    return (
        <Container >
            <Content>
                <Header>
                    <h2>Create a post</h2>
                    <button>X</button>
                    {/* <button> <img alt='#' src='/images/close-icon.svg' /> </button> */}
                </Header>
                <SharedContent>
                    <UserInfo>
                        <img alt='#' src='/images/user.svg' />
                        <span>Name</span>
                    </UserInfo>
                </SharedContent>
                <ShareCreation>
                    <AttachAssets>
                        <AssetButton>
                            <img alt='#' src='/images/photo-icon2.svg' />
                        </AssetButton>
                        <AssetButton>
                            <img alt='#' src='/images/video-icon2.svg' />
                        </AssetButton>
                    </AttachAssets>
                    <ShareComment>
                        <AssetButton>
                            <img alt='#' src='/images/comment-icon2.svg' style={{ marginLeft: '-12px' }} />
                            Anyone
                        </AssetButton>
                    </ShareComment>
                    <PostButton>
                        Post
                    </PostButton>
                </ShareCreation>
            </Content>
        </Container >
    )
}

const Container = styled.div`
    position:fixed;
    top:0;left:0;right:0;bottom:0;
    color:black;
    background-color:rgba(0,0,0,0.8);
    z-index:999;
`
const Content = styled.div`
    width:100%;
    max-width:552px;
    background-color:white;
    max-height:90%;
    overflow:initial;
    border-radius:5px;
    position:relative;
    display:flex;
    flex-direction:column;
    top:32px;
    margin:0 auto;
`
const Header = styled.div`
    display:block;
    padding:16px 20px;
    border-bottom:1px solid rgba(0,0,0,0.15);
    font-size:16px;
    line-height:1.5;
    color:rgba(0,0,0,0.6);
    font-weight:400px;
    display:flex;
    justify-content:space-between;
    align-items:center;
    button{
        height:40px;
        width:40px;
        min-width:auto;
        color:rgba(0,0,0,0.15);
        font-size:20px;
        //pointer-events:none;
    }
`
const SharedContent = styled.div`
    display:flex;
    flex-direction:column;
    flex-grow:1;
    overflow-y:auto;
    vertical-align:baseline;
    background:transparent;
    padding:8px 12px;
`
const UserInfo = styled.div`
    display:flex;
    align-items:center;
    padding:12px 24px;
    svg, img{
        width:48px;
        height:48px;
        background-clip:content-box;
        border:2px solid transparent;
        border-radius:50%;
    }    
    span{
        font-weight:600;
        font-size:16px;       
        line-height:1.5;
        margin-left:5px;
    }
`
const ShareCreation = styled.div`
    display:flex;
    justify-content:space-between;
    padding:12px 24px 12px 16px;
`
const AssetButton = styled.div`
    display:flex;
    align-items:center;
    height:40px;
    width:85px;
    min-width:auto;
    color:rgba(0,0,0,0.5);
    img{
        padding-left:20%;
    }
    background-color:#eee;
    border:2px solid rgba(0,0,0,0.3);
    border-radius:4px;
`
const AttachAssets = styled.div`
    align-items:center;
    display:flex;
    padding-right:8px;
    ${AssetButton}{
        background-color:#eee;
        border:2px solid rgba(0,0,0,0.3);
        border-radius:4px;
        width:40px;
        
    }
`
const ShareComment = styled.div`
    padding-left:8px;
    margin-right:auto;
    border-left:1px solid rgba(0,0,0,0.15);
    ${AssetButton}{
        svg{
            margin-right:5px;
        }
    }
`
const PostButton = styled.button`
    min-width:60px;
    border-radius:20px;
    padding-left:16px;
    padding-right:16px;
    background:#0a66c2;
    color: #fff;
    &:hover{
        background:#004182;
    }
`
export default PostModal