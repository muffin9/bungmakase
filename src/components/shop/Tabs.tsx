import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import HomeComponent from './HomeComponent';
import PhotosComponent from './PhotosComponent';
import ReviewsComponent from './ReviewsComponent';

const ShopTabs = () => {
  return (
    <Tabs defaultValue="home" className="w-full">
      <TabsList className="grid w-full grid-cols-3 bg-transparent">
        <TabsTrigger
          value="home"
          className="font-light data-[state=active]:text-black data-[state=active]:font-medium"
        >
          홈
        </TabsTrigger>
        <TabsTrigger
          value="photos"
          className="font-light data-[state=active]:text-black data-[state=active]:font-medium"
        >
          사진
        </TabsTrigger>
        <TabsTrigger
          value="reviews"
          className="font-light data-[state=active]:text-black data-[state=active]:font-medium"
        >
          후기
        </TabsTrigger>
      </TabsList>

      <TabsContent value="home" className="px-6 py-8">
        <HomeComponent />
      </TabsContent>

      <TabsContent value="photos" className="px-6 py-8">
        <PhotosComponent />
      </TabsContent>

      <TabsContent value="reviews" className="py-8">
        <ReviewsComponent />
      </TabsContent>
    </Tabs>
  );
};

export default ShopTabs;
