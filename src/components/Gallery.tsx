import { Collapse, Divider, Image } from "antd-mobile";
import Carousel from "antd/es/carousel";
const contentStyle = {
  height: "160px",
  color: "#fff",
  lineHeight: "160px",
  textAlign: "center",
  background: "#364d79",
} as any;

export const Gallery = () => {
  return (
    <>
      <Carousel autoplay>
        <div>
          <Image
            src={"./img/dog_1.jpeg"}
            style={{ maxHeight: 400 }}
            lazy={true}
            fit="fill"
          />
        </div>
        <div>
          <Image
            src={"./img/dog_2.jpeg"}
            style={{ maxHeight: 400 }}
            lazy={true}
          />
        </div>
        {/* <div>
          <Image
            src={"./img/cat_1.jpeg"}
            style={{ maxHeight: 400 }}
            lazy={true}
          />
        </div>
        <div>
          <Image
            src={"./img/cat_2.jpeg"}
            style={{ maxHeight: 400 }}
            lazy={true}
          />
        </div> */}
      </Carousel>
      <Collapse defaultActiveKey={["1"]} style={{ marginTop: "10px" }}>
        <Collapse.Panel
          key="1"
          title="Q: What photos work best for my pet Jimmy?"
        >
          A: Upload various pictures of Jimmy with easy backgrounds. Avoid
          pictures with other pets or people in the background.
        </Collapse.Panel>
        <Collapse.Panel key="2" title="Q: How long do I have to wait?">
          A: Currently you have to wait around 24 hours for your images to be
          ready
        </Collapse.Panel>
        <Collapse.Panel key="3" title="Q: Does it work with cats?">
          A: Absolutely, it works with all animals. For example this my cat in a
          chriistmas outfit
          <Image
            src={"./img/cat_1.jpeg"}
            style={{ maxHeight: 400, paddingTop: 20 }}
            lazy={true}
          />
        </Collapse.Panel>
      </Collapse>
    </>
  );
};
