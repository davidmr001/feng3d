module feng3d
{

	/**
	 * 组件事件
	 * @author feng 2015-12-2
	 */
	export class ComponentEvent extends Event
	{
		/**
		 * 添加子组件事件
		 * data = { container: Component, child: Component }
		 */
		public static ADDED_COMPONENT = "addedComponent";

		/**
		 * 移除子组件事件
		 * data = { container: Component, child: Component }
		 */
		public static REMOVED_COMPONENT = "removedComponent";

        /**
         * 事件目标。
         */
		public target: Component;
	}
}
