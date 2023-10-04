import Me from './me.module.scss';

const AboutMe = () => {
  return <div className={Me.root_content}>
    <h2>Меня зовут Ярослав Кондрияненко. Мне 18 лет, я из города Новосибирск. <br />Программирую на Python, Rust, JavaScript.</h2>
  </div>;
};

export default AboutMe;
