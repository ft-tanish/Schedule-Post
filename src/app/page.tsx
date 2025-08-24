import Layout from '@/components/Layout.optimized';
import PostForm from '@/components/PostForm.optimized';
import Timeline from '@/components/Timeline.optimized';

export default function Home() {
  return <Layout leftSide={<PostForm />} rightSide={<Timeline />} />;
}
