import React from "react";
import { Tree, TreeNode } from "react-organizational-chart";

interface PersonNode {
    label: string;
    image: string;
    role: string;
    children?: TreeData[];
}

interface GroupNode {
    people: PersonNode[];
    children?: TreeData[];
}

interface BasicNode {
    label: string;
    children?: TreeData[];
}

type TreeData = PersonNode | GroupNode | BasicNode;

interface OrgTreeProps {
    data: TreeData;
}

const isGroupNode = (node: TreeData): node is GroupNode => {
    return (node as GroupNode).people !== undefined;
};

const isPersonNode = (node: TreeData): node is PersonNode => {
    return (node as PersonNode).image !== undefined && (node as PersonNode).role !== undefined;
};

const renderPerson = (person: PersonNode) => (
    <div style={{ textAlign: "center" }}>
        <div>{person.label}</div>
        <div style={{ fontSize: "0.75rem", color: "#555" }}>{person.role}</div>
    </div>
);

// Recursive rendering
const renderNode = (node: TreeData) => {
    if (isGroupNode(node)) {
        return (
            <TreeNode
                key={node.people.map((p) => p.label).join("-")}
                label={
                    <div className="flex gap-2 justify-center">
                        {node.people.map((person) => renderPerson(person))}
                    </div>
                }
            >
                {node.children?.map((child) => renderNode(child))}
            </TreeNode>
        );
    }

    if (isPersonNode(node)) {
        return (
            <TreeNode label={renderPerson(node)} key={node.label}>
                {node.children?.map((child) => renderNode(child))}
            </TreeNode>
        );
    }

    return (
        <TreeNode label={<div>{node.label}</div>} key={node.label}>
            {node.children?.map((child) => renderNode(child))}
        </TreeNode>
    );
};




const OrgTree: React.FC<OrgTreeProps> = ({ data }) => {
    const topNode = isPersonNode(data) ? renderPerson(data) : <div>{data.label}</div>;

    return (
        <div className="overflow-auto">
            <Tree
                label={topNode}
                lineWidth="2px"
                lineColor="#ccc"
                lineBorderRadius="4px"
            >
                {data.children?.map((child) => renderNode(child))}
            </Tree>

        </div>
    );
};

export default OrgTree;
