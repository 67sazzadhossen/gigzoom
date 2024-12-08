import Features from "./Features";
import HeroSection from "./HeroSection";
import TestimonialSection from "./TestimonialSection";
import UsersCard from "./UsersCard";
import WorkSection from "./WorkSection";


const Home = () => {
    return (
        <div>
            <HeroSection></HeroSection>
            <Features></Features>
            <WorkSection></WorkSection>
            <UsersCard></UsersCard>
            <TestimonialSection></TestimonialSection>
        </div>
    );
};

export default Home;