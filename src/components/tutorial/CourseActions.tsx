import React from "react";
import { Button, Menu, HStack, Portal } from "@chakra-ui/react";
import { FaGithub, FaGoogleDrive, FaExternalLinkAlt } from "react-icons/fa";
import { HiOutlineChevronDown } from "react-icons/hi";

interface CourseActionsProps {
  githubUrl: string;
  colabUrl: string;
  liveDemoUrl: string;
}

/**
 * Provides action buttons for a course, such as viewing code on GitHub,
 * opening in Google Colab, or viewing a live demo.
 * @returns
 */
export default function CourseActions({
  githubUrl,
  colabUrl,
  liveDemoUrl,
}: CourseActionsProps) {
  return (
    <HStack>
      {/* Primary code button */}
      {githubUrl && (
        <Button variant="outline" size="sm" className="rounded-md pill ">
          <FaGithub />
          <a href={githubUrl} className="!no-underline">
            View Code
          </a>
        </Button>
      )}

      {/* Secondary menu for other resources */}
      {colabUrl || liveDemoUrl ? (
        <Menu.Root>
          <Menu.Trigger asChild>
            <Button variant="outline" size="sm" className="rounded-md pill">
              <HiOutlineChevronDown className="text-[var(--text1)]" />
              <span className="text-[var(--text1)]">Resources</span>
            </Button>
          </Menu.Trigger>
          <Portal>
            <Menu.Positioner>
              <Menu.Content className="font-sans text-sm">
                {colabUrl && (
                  <Menu.Item value="new-txt-a">
                    <FaGoogleDrive />
                    <a href={colabUrl}>Open in Google Colab</a>
                  </Menu.Item>
                )}
                {liveDemoUrl && (
                  <Menu.Item value="new-file-a">
                    <FaExternalLinkAlt />
                    <a href={liveDemoUrl}>View Live Demo</a>
                  </Menu.Item>
                )}
              </Menu.Content>
            </Menu.Positioner>
          </Portal>
        </Menu.Root>
      ) : null}
      
    </HStack>
  );
}
