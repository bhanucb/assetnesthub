import { FC } from "react";
import Box from "@mui/material/Box";

const PricingLayout: FC = () => {
  // const [layoutModel, setLayoutModel] = useState<Model>(
  //   Model.fromJson(gridLayoutModel)
  // );
  // const layoutAction = useRef<LayoutAction>();

  // useEffect(() => {
  //   if (selectedBook !== undefined) {
  //     getLastSavedPricingLayout(selectedBook).then((model) => {
  //       if (model) {
  //         setLayoutModel(model);
  //       }
  //     });
  //   }
  // }, []);

  // function handleLayoutAction(action: Action) {
  //   layoutAction.current = action.type as LayoutAction;
  //   return action;
  // }

  // async function handleModelChange(model: Model) {
  //   if (
  //     layoutAction.current === SelectTabAction ||
  //     layoutAction.current === MoveNodeAction ||
  //     layoutAction.current === DeleteTabAction ||
  //     layoutAction.current === MaximizeToggleAction
  //   ) {
  //     if (selectedBook !== undefined) {
  //       await savePricingLayout(selectedBook, model);
  //     }
  //   }
  // }

  return <Box>Hello Pricing</Box>;
};

export default PricingLayout;
