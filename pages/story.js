import fetch from 'isomorphic-fetch'
import Error from 'next/error'

import Layout from  '../components/Layout'
import CommentList from '../components/CommentList'

class Story extends React.Component {
    static async getInitialProps({ req, res, query }) {
        let story;
        try{
            const storyId = query.id;
            const res = await fetch(`https://node-hnapi.herokuapp.com/item/${storyId}`);
            story = await res.json();
        } catch {
            console.log(err);
            story = null;
        }
        return { story }
    }

    render() {
        const { story } = this.props;

        if(!story) {
            return <Error statusCode={503} />
        }
        return(
            <Layout title={story.title} backButton={true}>
                <main>
                    <h1 className='storyTitle'><a href={story.url}>{story.title}</a></h1>
                    <div className='storyDetails'>
                        <strong>{story.points} points</strong>
                        <strong>{story.comments_count} comments</strong>
                        <strong>{story.time_ago}</strong>
                    </div>

                    {story.comments.length > 0 ? (
                        <CommentList comments={story.comments} />
                    ) : (
                        <div>Np comments for this story</div>
                    )}
                </main>
                <style jsx>{`
                    main {
                        padding: 1em;
                    }
                    .storyTitle {
                        font-size: 1.2rem;
                        margin: 0;
                        font-weight: 300;
                        padding-bottom: 0.5em
                    }
                    .storyTitle a {
                        color: #333;
                        text-decoration: none
                    }
                    .storyTitle a:hover {
                        text-decoration: underline;
                    }
                    .storyDetails {
                        font-size: 0.8rem;
                        padding-bottom: 1em;
                        border-bottom: 1px solid black;
                        margin-bottom: 1em;
                    }
                    .storyDetails strong {
                        margin-right: 1em
                    }
                    .storyDetails a {
                        color: #f60;
                    }
                `}</style>
            </Layout>
        )
    }
}
export default Story