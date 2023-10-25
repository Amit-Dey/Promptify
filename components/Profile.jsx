import PropTypes from 'prop-types';
import PromptCard from "./PromptCard";

const Profile = ({ name, desc, data, handleEdit, handleDelete }) => {
  const renderPromptCards = () => {
    return data.map((post) => (
      <PromptCard
        key={post.id}
        post={post}
        handleEdit={() => handleEdit(post)}
        handleDelete={() => handleDelete(post)}
      />
    ));
  };

  return (
    <section className="w-full">
      <h1 className="head_text text-left">
        <span className="blue_gradient">
          {`${name} Profile`}
        </span>
      </h1>
      <p className="desc text-left">{desc}</p>
      <div className="prompt_layout flex gap-6 mt-10">
        {renderPromptCards()}
      </div>
    </section>
  );
};

Profile.propTypes = {
  name: PropTypes.string.isRequired,
  desc: PropTypes.string.isRequired,
  data: PropTypes.array.isRequired,
  handleEdit: PropTypes.func.isRequired,
  handleDelete: PropTypes.func.isRequired,
};

export default Profile;
